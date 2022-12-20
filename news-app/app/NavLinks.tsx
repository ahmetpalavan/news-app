"use client"

import { categories } from "../constants"
import {usePathname} from 'next/navigation'
import NavLink from "./NavLink"

const NavLinks = () => {
  const pathname = usePathname()
  const isActive = (path:string) => {
    return pathname?.split('/').pop() === path;
  }
  /* [mysite.com, technology, news] */

  return (
    <nav className="grid grid-cols-4 text-xs md:grid-cols-7
    gap-4 pb-10 border-b max-w-6xl mx-auto
    ">
      {categories.map((category)=>( 
        <NavLink 
          key={category} 
          category={category} 
          isActive={isActive(category)} /> 
      ))}
    </nav>
  )
}

export default NavLinks


