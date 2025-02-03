"use client"

import { useState, useEffect, useCallback } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Loader2, AlertTriangle } from "lucide-react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { FallbackAuth } from "@/components/auth/fallback-auth"

export function WalletButton() {
  const { publicKey, connecting, connected, disconnect } = useWallet()
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false)
  const [showFallbackAuth, setShowFallbackAuth] = useState(false)

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.solana && window.solana.isPhantom) {
        try {
          await window.solana.connect({ onlyIfTrusted: true })
        } catch (error) {
          console.log("Auto-connect error (expected if not previously connected):", error)
        }
      }
    }

    checkWalletConnection()
  }, [])

  const handleConnect = useCallback(async () => {
    setIsConnecting(true)
    setConnectionError(null)
    try {
      // The actual connection is handled by the WalletMultiButton
      setIsConnecting(false)
    } catch (error) {
      console.error("Wallet connection error:", error)
      setConnectionError("Failed to connect wallet. Please try again or use email login.")
      setIsErrorDialogOpen(true)
      setIsConnecting(false)
    }
  }, [])

  const handleDisconnect = async () => {
    try {
      await disconnect()
      toast.success("Wallet disconnected successfully")
    } catch (error) {
      console.error("Wallet disconnection error:", error)
      toast.error("Failed to disconnect wallet")
    }
  }

  return (
    <>
      <WalletMultiButton
        startIcon={
          connected ? (
            <Image
              src="https://ucarecdn.com/0aa23f11-40b3-4cdc-891b-a169ed9f9328/sol.png"
              alt="Solana Logo"
              width={16}
              height={16}
              className="mr-2"
            />
          ) : null
        }
        className={`bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded transition-colors duration-200 ${
          connecting || isConnecting ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {connecting || isConnecting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            <span>Connecting...</span>
          </>
        ) : connected ? (
          "Disconnect"
        ) : (
          "Connect Wallet"
        )}
      </WalletMultiButton>

      <Dialog open={isErrorDialogOpen} onOpenChange={setIsErrorDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Wallet Connection Error</DialogTitle>
            <DialogDescription>
              <AlertTriangle className="h-6 w-6 text-yellow-500 mb-2" />
              {connectionError}
              <p className="mt-2">
                If you don't have a wallet installed, you can install Phantom from{" "}
                <a
                  href="https://phantom.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-primary"
                >
                  phantom.app
                </a>{" "}
                or use Helius for Solana interactions.
              </p>
              <p className="mt-2">Alternatively, you can use our fallback authentication method:</p>
              {showFallbackAuth ? (
                <FallbackAuth />
              ) : (
                <Button onClick={() => setShowFallbackAuth(true)} className="mt-2">
                  Use Email Login
                </Button>
              )}
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setIsErrorDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </>
  )
}

