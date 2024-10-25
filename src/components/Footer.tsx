import React from "react";
import {
  Mail,
  MapPin,
  Phone,
  CreditCard,
  Truck,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 mt-60">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-white">
                Suscríbete a nuestro newsletter
              </h3>
              <p className="text-gray-400 mt-1">
                Recibe ofertas exclusivas y las últimas novedades
              </p>
            </div>
            <div className="w-full md:w-auto">
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow md:w-64"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors">
                  Suscribir
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Nuestra Tienda
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MapPin size={18} className="text-blue-500" />
                <span>Calle Principal 123, Madrid</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-blue-500" />
                <span>+34 900 123 456</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-blue-500" />
                <span>contacto@tienda.com</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Atención al Cliente
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  Mi Cuenta
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  Seguimiento de Pedidos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  Wishlist
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  Devoluciones
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Características
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Truck size={18} className="text-blue-500" />
                <span>Envío Gratis desde 50€</span>
              </li>
              <li className="flex items-center gap-2">
                <CreditCard size={18} className="text-blue-500" />
                <span>Pago Seguro</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-blue-500" />
                <span>Garantía de Calidad</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm">
              © 2024 Tu Tienda Online. Todos los derechos reservados.
            </div>
            {/*           <div className="flex gap-4">
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Youtube size={20} />
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
