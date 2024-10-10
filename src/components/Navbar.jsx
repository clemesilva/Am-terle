import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthProvider"; // Importamos el hook de autenticación

export default function Navbar1() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { user, handleLogout } = useAuth(); // Accedemos al estado de autenticación y a la función de logout

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar className="bg-neutral-800" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-yellow-100">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link to="/" className="text-yellow-100">
            INICIO
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link to="/routines" className="text-yellow-100">
            RUTINAS
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link to="/nutrition" className="text-yellow-100">
            NUTRICIÓN
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link to="/subirRutina" className="text-yellow-100">
            SUBIR RUTINA
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link to="/sensations" className="text-yellow-100">
            SENSACIONES
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link to="/calendar" className="text-yellow-100">
            CALENDARIO
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {user ? ( // Si hay un usuario autenticado, mostramos Cerrar Sesión
          <>
            <NavbarItem>
              <span className="text-yellow-100 mr-4">{user.email}</span>
            </NavbarItem>
            <NavbarItem>
              <button
                onClick={handleLogout} // Función para cerrar sesión
                className="bg-yellow-100 text-neutral-800 py-2 px-4 rounded hover:bg-yellow-200"
              >
                Cerrar Sesión
              </button>
            </NavbarItem>
          </>
        ) : (
          // Si no hay usuario autenticado, mostramos Login y Sign Up
          <>
            <NavbarItem className="hidden lg:flex">
              <Link to="/login" className="text-yellow-100">
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link to="/signup" className="text-blue-600">
                Sign Up
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
