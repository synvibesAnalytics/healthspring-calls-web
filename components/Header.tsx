import Link from "next/link"
import Image from "next/image"

const Header = () => {
  return (
    <div>
      <header className="bg-[#fefeff] z-0 relative border-b-2 border-[#6b6b6b2f]">
        <div className="mx-auto  px-4 pb-6 sm:px-6 lg:px-24 pt-6">
          <div className="text-center flex flex-row justify-between items-center">
            <Image src="/logos/logo.png" alt="healthspring logo" height={200} width={150} />
            <nav className="flex items-center gap-3 lg:gap-6">
              <Link href="/" className="text-sm hover:text-primary">
                Dashboard
              </Link>
              <Link href="/" className="text-sm hover:text-primary">
                Admin
              </Link>
            </nav>


          </div>

        </div>
      </header>
    </div>
  );


}

export default Header;

