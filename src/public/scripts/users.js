const deleteUser = async (email) => {
  try {
    const response = await fetch(`/api/sessions/${email}`, {
      method: "DELETE",
    });
    const data = await response.json();

    if (data.status === "success") {
      alert(`${data.payload}`);
      return data;
    }

    alert("No se ha podido eliminar el usuario");

  } catch (error) {
    console.error(error);
  }
};


const changeRole = async (id, role) => {
  const newRole = role === "usuario" ? "premium" : "usuario";
  try {
    const response = await fetch(`/api/sessions/premium/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: newRole }),
    });
    const data = await response.json();

    alert(`${data.payload}`);
    window.location.href = "/users";
  } catch (error) {
    console.error(error);
  }
}

module.exports = {deleteUser, changeRole}