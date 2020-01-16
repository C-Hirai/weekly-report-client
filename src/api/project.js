const { apiUrl } = "http://170.49.27.111:9080";
const headers = {
  "Content-Type": "application/json"
};

async function getProject() {
  const res = await fetch(`${apiUrl}/api/`, {
    method: "GET",
    headers
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
  return json;
}

async function registerProject() {}

async function editProjectInfo() {}

async function changeProjectStatus() {}
