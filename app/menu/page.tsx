import { MenuTable } from "@/components/menu/menu-table"
import { getMenuData } from "@/lib/database"

export default async function MenuPage() {
  const menuItems = await getMenuData()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Menu Management</h1>
      <MenuTable data={menuItems} />
    </div>
  )
}

