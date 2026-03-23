import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, MessageCircle } from 'lucide-react'

const footerLinks = {
  shop: [
    { href: '/category/handbags-wallets', label: 'Handbags & Wallets' },
    { href: '/category/perfumes', label: 'Perfumes' },
    { href: '/category/watches', label: 'Watches' },
    { href: '/category/kids-products', label: "Kids' Products" },
    { href: '/category/cosmetics', label: 'Cosmetics' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms & Conditions' },
    { href: '/contact', label: 'Contact Us' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <img src="/images/logo.png" alt="Elik" className="h-20 w-auto brightness-0 invert" />
            </Link>
            <p className="mt-4 text-stone-400 max-w-sm">
              Premium quality products for the discerning customer.
              Discover elegance, sophistication, and style in every purchase.
            </p>
            <div className="flex items-center space-x-3 mt-6">
              <a href="https://wa.me/923045163438" target="_blank" rel="noopener noreferrer"
                className="p-2 bg-stone-800 rounded-full hover:bg-[#25D366] hover:text-white transition-colors" aria-label="WhatsApp">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="p-2 bg-stone-800 rounded-full hover:bg-amber-400 hover:text-stone-900 transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="p-2 bg-stone-800 rounded-full hover:bg-amber-400 hover:text-stone-900 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="p-2 bg-stone-800 rounded-full hover:bg-amber-400 hover:text-stone-900 transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-stone-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-stone-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-stone-400">19, G Block Gulberg III,<br />Lahore, Pakistan</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <a href="tel:+923045163438" className="text-stone-400 hover:text-white transition-colors">+92 304 516 3438</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <a href="mailto:aliraxaa95@gmail.com" className="text-stone-400 hover:text-white transition-colors">aliraxaa95@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-stone-400 text-sm">© {new Date().getFullYear()} Elik. All rights reserved.</p>
            <div className="flex items-center space-x-6">
              <Link href="/privacy" className="text-sm text-stone-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-stone-400 hover:text-white transition-colors">Terms &amp; Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
