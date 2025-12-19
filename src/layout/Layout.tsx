import { Link, Outlet, useLocation } from "react-router-dom";
import { ListTodo, Globe } from "lucide-react";
import clsx from "clsx";

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { path: "/todos", label: "Todos", icon: ListTodo },
    { path: "/posts", label: "Posts", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center h-16">
            <div>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={clsx(
                      "inline-flex items-center px-4 pt-1 border-b-2 text-sm font-medium transition-colors h-full",
                      isActive
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    )}
                  >
                    <Icon className="mr-2" size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
