export default function Navbar() {
  return (
    <div class="sticky top-0 z-50 bg-green-800 text-white shadow-lg">
      <div class="container mx-auto px-4 flex justify-between items-center h-16">
        {/* <!-- Logo --> */}
        <a href="#" class="text-2xl font-bold tracking-wide">
          🍴 MyRestaurant
        </a>

        {/* <!-- Nav Links --> */}
        <nav class="hidden md:flex space-x-8 ">
          <a href="#menu" class="hover:text-yellow-300 transition duration-300">
            Menu
          </a>
          <a href="#about" class="hover:text-yellow-300 transition duration-300">
            About Us
          </a>
        </nav>

        {/* <!-- CTA Button --> */}
        <div class="hidden md:block">
          <a href="#book" class="bg-yellow-300 text-black px-6 py-2 rounded-md font-medium hover:bg-yellow-400 transition duration-300">
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
}
