import { motion } from 'framer-motion'

const Header = () => {
  return (
    <header className="py-6">
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-2xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent">
            SNS
          </span>
        </motion.div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-600 hover:text-primary transition-colors">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-primary transition-colors">
            Explore
          </a>
          <a href="#" className="text-gray-600 hover:text-primary transition-colors">
            About
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header 