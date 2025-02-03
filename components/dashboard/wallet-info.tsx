import { useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { bs58 } from "bs58"
import { useAuth } from "@/hooks/use-auth"

export function WalletInfo() {
  const { publicKey, signMessage } = useWallet()
  const { user, fetchUser } = useAuth()
  const [message, setMessage] = useState("")
  const [signature, setSignature] = useState<string | null>(null)
  const [isAssociating, setIsAssociating] = useState(false)

  const handleSignMessage = async () => {
    if (!publicKey || !signMessage) {
      toast.error("Wallet not connected")
      return
    }

    try {
      const encodedMessage = new TextEncoder().encode(message)
      const signatureBytes = await signMessage(encodedMessage)
      const signatureBase58 = bs58.encode(signatureBytes)
      setSignature(signatureBase58)
      toast.success("Message signed successfully")
    } catch (error) {
      console.error("Error signing message:", error)
      toast.error("Failed to sign message. Please try again.")
    }
  }

  const handleAssociateWallet = async () => {
    if (!publicKey || !signMessage) {
      toast.error("Wallet not connected")
      return
    }

    setIsAssociating(true)
    try {
      const message = `Associate wallet ${publicKey.toBase58()} with BARK AI Agent account`
      const encodedMessage = new TextEncoder().encode(message)
      const signatureBytes = await signMessage(encodedMessage)
      const signature = bs58.encode(signatureBytes)

      const response = await fetch("/api/auth/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: publicKey.toBase58(),
          signature,
          message,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Wallet associated successfully")
        fetchUser()
      } else {
        throw new Error(data.error || "Failed to associate wallet")
      }
    } catch (error) {
      console.error("Error associating wallet:", error)
      toast.error("Failed to associate wallet. Please try again.")
    } finally {
      setIsAssociating(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Wallet Information</h2>
      {publicKey ? (
        <>
          <p>Connected Address: {publicKey.toBase58()}</p>
          {user?.walletAddress === publicKey.toBase58() ? (
            <p className="text-green-500">This wallet is associated with your account</p>
          ) : (
            <Button onClick={handleAssociateWallet} disabled={isAssociating}>
              {isAssociating ? "Associating..." : "Associate Wallet with Account"}
            </Button>
          )}
          <div className="space-y-2">
            <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter a message to sign" />
            <Button onClick={handleSignMessage}>Sign Message</Button>
          </div>
          {signature && (
            <div>
              <h3 className="text-lg font-semibold">Signature:</h3>
              <p className="break-all">{signature}</p>
            </div>
          )}
        </>
      ) : (
        <p>No wallet connected. Please connect your wallet using the button in the sidebar.</p>
      )}
    </div>
  )
}

