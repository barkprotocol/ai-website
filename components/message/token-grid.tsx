import type { Token } from "@/types/token"
import { useMemo } from "react"
import { useTheme } from "next-themes"
import { shortenAddress } from "@/utils/shorten-address"

interface TokenGridProps {
  tokens: Token[]
}

const TokenGrid: React.FC<TokenGridProps> = ({ tokens }) => {
  const { theme } = useTheme()
  // Replace useAccount with a placeholder
  const address = "0x..." // Replace this with the actual user's address when available

  const formattedTokens = useMemo(() => {
    return tokens.map((token) => ({
      ...token,
      shortAddress: shortenAddress(token.address),
    }))
  }, [tokens])

  return (
    <div className="grid grid-cols-4 gap-4">
      {formattedTokens.map((token) => (
        <div
          key={token.address}
          className={`bg-${theme === "dark" ? "gray-800" : "gray-100"} rounded-lg p-4 shadow-md`}
        >
          <div className="flex items-center space-x-2">
            <img src={token.logoURI || "/placeholder.svg"} alt={token.name} className="w-8 h-8 rounded-full" />
            <div>
              <p className="text-lg font-medium">{token.name}</p>
              <p className="text-sm text-gray-500">{token.symbol}</p>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              {address && token.address === address ? "Your Address" : token.shortAddress}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TokenGrid

