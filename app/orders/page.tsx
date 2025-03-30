import { OrdersTable } from "@/components/orders/orders-table"
import { getOrderData } from "@/lib/database"

export default async function OrdersPage() {
  const orders = await getOrderData()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Orders</h1>
      <OrdersTable data={orders} />
    </div>
  )
}

