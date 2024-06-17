const registrationForm = document.getElementById('registrationForm');
const userList = document.getElementById('userList');
const users = [];

registrationForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const birthDate = new Date(document.getElementById('birthDate').value);
    const email = document.getElementById('email').value;
    const position = document.getElementById('position').value;
    const startDate = new Date(document.getElementById('startDate').value);

    // Validar que el correo no se repita
    if (users.some(user => user.email === email)) {
        alert('El correo electrónico ya está registrado.');
        return;
    }

    // Validar que la fecha de ingreso sea mayor a la fecha de nacimiento + 18 años
    const eighteenYearsLater = new Date(birthDate.getFullYear() + 18, birthDate.getMonth(), birthDate.getDate());
    if (startDate < eighteenYearsLater) {
        alert('Debes ser mayor de edad en la Fecha de Ingreso.');
        return;
    }

    // Mostrar ventana modal de confirmación
    const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'), {
        backdrop: 'static',
        keyboard: false
    });

    const confirmButton = confirmModal._element.querySelector('#confirmButton');
    confirmButton.addEventListener('click', () => {
        confirmModal.hide();
        addUser(firstName, lastName, birthDate, email, position, startDate);
    });

    confirmModal.show();
});


function addUser(firstName, lastName, birthDate, email, position, startDate) {
    const user = {
        firstName,
        lastName,
        birthDate,
        email,
        position,
        startDate
    };

    users.push(user);

    // Verificar si el usuario ya existe en la lista HTML
    const existingUserCard = Array.from(userList.children).find(card => card.querySelector('.card-text').textContent === email);

    if (!existingUserCard) {
        // Crear un nuevo elemento para el usuario
        const userCard = document.createElement('div');
        userCard.classList.add('col-md-3');
        userCard.innerHTML = `
      <div class="card user-card">
        <div class="card-body">
          <h5 class="card-title">${user.firstName} ${user.lastName}</h5>
          <p class="card-text">${user.email}</p>
          <p class="card-text">${user.position}</p>
          <p class="card-text">${user.startDate.toLocaleDateString()}</p>
          <button class="btn btn-danger btn-sm remove-user">Eliminar</button>
        </div>
      </div>
    `;

        // Agregar el nuevo elemento a la lista de usuarios
        userList.appendChild(userCard);

        // Agregar el evento click al botón de eliminar
        userCard.querySelector('.remove-user').addEventListener('click', function() {
            userList.removeChild(userCard);
            const index = users.findIndex(u => u.email === user.email);
            users.splice(index, 1); // Eliminar el usuario del array users
        });
    }

    registrationForm.reset();
}