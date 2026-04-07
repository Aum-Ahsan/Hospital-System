import { ExternalLink, CreditCard, Clock, Smartphone } from 'lucide-react';

export default function EChanneling() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">E-Channeling Portal</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Book your appointments instantly through our integrated national e-channeling system. Secure, fast, and convenient.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-primary-900/5 border border-gray-100 overflow-hidden">
          <div className="grid md:grid-cols-2">
            
            <div className="p-8 md:p-12 bg-gradient-to-br from-primary-50 to-white flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why use E-Channeling?</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Instant Booking</h3>
                    <p className="text-sm text-gray-500 mt-1">Real-time availability and instant confirmation with queue number.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Secure Payments</h3>
                    <p className="text-sm text-gray-500 mt-1">Pay easily via Credit/Debit cards, mobile wallets, or bank transfer.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                    <Smartphone className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">SMS Reminders</h3>
                    <p className="text-sm text-gray-500 mt-1">Get automated alerts about your appointment time and delays.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center bg-white">
              <div className="w-24 h-24 mb-6">
                <img src="/vite.svg" alt="E-Channeling Logo" className="w-full h-full object-contain filter drop-shadow-sm" />
                {/* Note: In a real app we'd use the actual e-channeling provider logo */}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">National E-Channeling Service</h3>
              <p className="text-gray-500 text-sm mb-8">
                You will be redirected to the secure portal to complete your booking. Have your ID and payment details ready.
              </p>
              
              <a
                href="https://www.echannelling.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold rounded-xl hover:from-accent-600 hover:to-accent-700 transition-all shadow-lg shadow-accent-500/25 hover:shadow-accent-500/40 hover:-translate-y-0.5"
              >
                Proceed to E-Channel
                <ExternalLink className="w-5 h-5" />
              </a>
              
              <p className="mt-6 text-xs text-gray-400">
                By proceeding, you agree to the terms and conditions of the third-party service provider.
              </p>
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  );
}
