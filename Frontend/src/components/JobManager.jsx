const backendURL = "http://127.0.0.1:8000";

/**
 * Fetches all jobs from the backend.
 * @returns {Promise<Array>} A promise that resolves to an array of jobs.
 */
export async function fetchJobs() {
  try {
    const response = await fetch(`${backendURL}/jobs`);
    if (!response.ok) {
      throw new Error("Error fetching jobs");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
}

/**
 * Creates a new job with the given job data.
 * @param {Object} jobData - The job data to create a new job.
 * @returns {Promise<Object>} A promise that resolves to the created job data.
 */
export async function createJob(jobData) {
  try {
    const response = await fetch(`${backendURL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jobData)
    });
    if (!response.ok) {
      throw new Error("Error creating job");
    }
    const data = await response.json();
    console.log("Job created:", data);
    return data;
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
}

/**
 * Deletes a job identified by jobId.
 * @param {string|number} jobId - The ID of the job to delete.
 * @returns {Promise<Response>} A promise that resolves to the fetch response.
 */
export async function deleteJob(jobId) {
  try {
    const response = await fetch(`${backendURL}/jobs/${jobId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error("Error deleting job");
    }
    console.log("Job deleted:", jobId);
    return response;
  } catch (error) {
    console.error("Error deleting job:", error);
    throw error;
  }
}
