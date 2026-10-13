import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";

interface BackgroundJob {
  jobId: number;
  orderId: number;
  jobType: string;
  status: string;
  message: string;
}

const API_URL = import.meta.env.VITE_API_URL;
const WS_URL = API_URL.replace(/^http/, "ws") + "/ws-smartcart";

function BackgroundJobMonitor() {
  const [jobs, setJobs] = useState<BackgroundJob[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Load existing jobs on mount
    fetch(`${API_URL}/api/jobs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Failed to load jobs:", err));

    // Connect to WebSocket for live updates
    const client = new Client({
      brokerURL: WS_URL,
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe("/topic/jobs", (message) => {
          const updatedJob: BackgroundJob = JSON.parse(message.body);

          setJobs((prevJobs) => {
            const exists = prevJobs.some((j) => j.jobId === updatedJob.jobId);
            if (exists) {
              return prevJobs.map((j) =>
                j.jobId === updatedJob.jobId ? updatedJob : j
              );
            } else {
              return [...prevJobs, updatedJob];
            }
          });
        });
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  const statusClass = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "job-status completed";
      case "PROCESSING":
        return "job-status processing";
      case "PENDING":
        return "job-status pending";
      case "FAILED":
        return "job-status failed";
      default:
        return "job-status";
    }
  };

  return (
    <div className="job-monitor">
      <h2>Background Job Monitor</h2>
      <table>
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Order ID</th>
            <th>Type</th>
            <th>Status</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.jobId}>
              <td>{job.jobId}</td>
              <td>{job.orderId}</td>
              <td>{job.jobType}</td>
              <td>
                <span className={statusClass(job.status)}>{job.status}</span>
              </td>
              <td>{job.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BackgroundJobMonitor;