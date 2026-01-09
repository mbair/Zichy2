import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export function urlValidator(
    allowedProtocols: string[] = ['http:', 'https:']
): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const raw = control.value

        if (raw === null || raw === undefined) return null

        const value = String(raw).trim()
        if (value.length === 0) return null

        // Require explicit http(s):// (so "http:asdf" is NOT accepted)
        if (!/^https?:\/\//i.test(value)) {
            return { invalidUrl: true }
        }

        try {
            const url = new URL(value)

            // Protocol must be allowed
            if (!allowedProtocols.includes(url.protocol)) {
                return { invalidUrl: true }
            }

            // Must have a hostname
            const host = url.hostname
            if (!host) {
                return { invalidUrl: true }
            }

            // Reject trailing dot, leading dot, or double dots (so "http://asdsa." is NOT accepted)
            if (host.endsWith('.') || host.startsWith('.') || host.includes('..')) {
                return { invalidUrl: true }
            }

            // Allow localhost / IPs otherwise require a domain with at least one dot
            const isLocalhost = host === 'localhost'
            const isIpv4 = /^\d{1,3}(\.\d{1,3}){3}$/.test(host)
            const isIpv6 = /^\[[0-9a-f:]+\]$/i.test(host)
            const hasDot = host.includes('.')

            if (!(hasDot || isLocalhost || isIpv4 || isIpv6)) {
                return { invalidUrl: true }
            }

            // If it's a domain (not localhost/IP), do basic label validation
            if (!isLocalhost && !isIpv4 && !isIpv6) {
                const labels = host.split('.')

                // Must look like "name.tld"
                if (labels.length < 2) {
                    return { invalidUrl: true }
                }

                for (const label of labels) {
                    // 1..63 chars, alnum or hyphen no leading/trailing hyphen
                    if (!/^[a-z0-9-]{1,63}$/i.test(label)) {
                        return { invalidUrl: true }
                    }
                    if (label.startsWith('-') || label.endsWith('-')) {
                        return { invalidUrl: true }
                    }
                }

                // Basic TLD sanity: letters (>=2) or punycode
                const tld = labels[labels.length - 1]
                if (!(tld.startsWith('xn--') || /^[a-z]{2,}$/i.test(tld))) {
                    return { invalidUrl: true }
                }
            }

            return null
        } catch {
            return { invalidUrl: true }
        }
    }
}
