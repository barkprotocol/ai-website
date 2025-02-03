"use client"

import { useState, useCallback, useMemo } from "react"
import { Loader2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { usePrivy } from "@privy-io/react-auth"

export function EAPTransactionChecker() {
  const [txHash, setTxHash] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    message: string
  } | null>(null)
  const { user } = usePrivy()

  const isValidTxHash = useMemo(() => /^[A-Za-z0-9]{64}$/.test(txHash), [txHash])

  const handleCheck = useCallback(async () => {
    if (!user) {
      setResult({
        success: false,
        message: "Please log in to check your EAP transaction.",
      })
      return
    }

    if (!isValidTxHash) {
      setResult({
        success: false,
        message: "Please enter a valid transaction hash.",
      })
      return
    }

    setIsChecking(true)
    try {
      const response = await fetch("/api/check-eap-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ txHash }),
      })
      const data = await response.json()
      setResult({
        success: data.success,
        message:
          data.message ||
          (data.success
            ? "Transaction verified successfully. EAP should be granted to your account."
            : "Failed to verify transaction. Please try again."),
      })
    } catch (error) {
      console.error("Error checking transaction:", error)
      setResult({
        success: false,
        message: "An error occurred while verifying the transaction. Please try again later.",
      })
    } finally {
      setIsChecking(false)
    }
  }, [user, txHash, isValidTxHash])

  return (
    <div className="space-y-4">
      <div className="flex gap-2 px-6">
        <Input
          placeholder="Paste transaction hash"
          value={txHash}
          onChange={(e) => setTxHash(e.target.value)}
          aria-label="Transaction hash input"
        />
        <Button
          onClick={handleCheck}
          disabled={isChecking || !isValidTxHash || !user}
          aria-label={isChecking ? "Checking transaction" : "Submit transaction for verification"}
        >
          {isChecking ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </div>

      <AlertDialog open={!!result} onOpenChange={() => setResult(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{result?.success ? "Transaction Verified" : "Verification Failed"}</AlertDialogTitle>
            <AlertDialogDescription>{result?.message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

