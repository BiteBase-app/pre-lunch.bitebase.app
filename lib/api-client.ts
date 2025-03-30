// API client for making requests to the backend

type ApiResponse<T> = {
  data?: T
  error?: string
}

export async function fetchProjects(): Promise<ApiResponse<any[]>> {
  try {
    const response = await fetch("/api/projects")

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    console.error("Error fetching projects:", error)
    return { error: "Failed to fetch projects" }
  }
}

export async function fetchProject(id: string): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`/api/projects/${id}`)

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    console.error(`Error fetching project ${id}:`, error)
    return { error: "Failed to fetch project" }
  }
}

export async function createProject(projectData: any): Promise<ApiResponse<any>> {
  try {
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    console.error("Error creating project:", error)
    return { error: "Failed to create project" }
  }
}

export async function updateProject(id: string, projectData: any): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    console.error(`Error updating project ${id}:`, error)
    return { error: "Failed to update project" }
  }
}

export async function deleteProject(id: string): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    console.error(`Error deleting project ${id}:`, error)
    return { error: "Failed to delete project" }
  }
}

export async function startAnalysis(analysisData: any): Promise<ApiResponse<any>> {
  try {
    const response = await fetch("/api/analysis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(analysisData),
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    console.error("Error starting analysis:", error)
    return { error: "Failed to start analysis" }
  }
}

export async function generateInsights(insightData: any): Promise<ApiResponse<any>> {
  try {
    const response = await fetch("/api/insights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(insightData),
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    console.error("Error generating insights:", error)
    return { error: "Failed to generate insights" }
  }
}

