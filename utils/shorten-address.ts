/**
 * Shortens a given address by keeping a specified number of characters at the beginning and end.
 *
 * @param address - The full address to be shortened.
 * @param chars - The number of characters to keep at the beginning and end. Default is 4.
 * @returns The shortened address string.
 */
export function shortenAddress(address: string, chars = 4): string {
    if (!address) {
      return ""
    }
  
    const prefixLength = Math.min(chars, Math.floor(address.length / 2))
    const suffixLength = Math.min(chars, address.length - prefixLength)
  
    return `${address.slice(0, prefixLength)}...${address.slice(-suffixLength)}`
  }
  
  /**
   * Shortens a given address based on the screen size.
   *
   * @param address - The full address to be shortened.
   * @param mobileChars - The number of characters to keep on mobile screens. Default is 4.
   * @param desktopChars - The number of characters to keep on desktop screens. Default is 6.
   * @returns The shortened address string.
   */
  export function responsiveShortenAddress(address: string, mobileChars = 4, desktopChars = 6): string {
    if (typeof window === "undefined") {
      // Server-side rendering, return the desktop version
      return shortenAddress(address, desktopChars)
    }
  
    const isMobile = window.innerWidth < 768 // Adjust this breakpoint as needed
    return shortenAddress(address, isMobile ? mobileChars : desktopChars)
  }
  
  