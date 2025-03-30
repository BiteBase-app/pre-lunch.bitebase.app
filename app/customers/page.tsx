import { CustomersTable } from "@/components/customers/customers-table"
import { getCustomerData } from "@/lib/database"

export default async function CustomersPage() {
  const customers = await getCustomerData()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Customers</h1>
      <CustomersTable data={customers} />
    </div>
  )
}

