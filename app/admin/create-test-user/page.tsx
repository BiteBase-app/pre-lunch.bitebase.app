import CreateTestUser from "@/scripts/create-test-user"

export default function CreateTestUserPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Admin Tools</h1>
      <CreateTestUser />
    </div>
  )
}

