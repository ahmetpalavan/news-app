"use client"

import { category } from "../constants"
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
      {category.map((cat)=>( 
        <NavLink 
          key={cat} 
          category={cat} 
          isActive={isActive(cat)} /> 
      ))}
    </nav>
  )
}

export default NavLinks