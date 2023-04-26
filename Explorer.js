const form = document.querySelector('form');
      const result = document.querySelector('#result');

      form.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = form.elements.username.value;

        fetch(`https://api.github.com/users/${username}`)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('User not found');
          })
          .then(data => {
            const profileLink = `<a href="${data.html_url}" target="_blank">${data.name || data.login}</a>`;
            result.innerHTML = `
              <h2>${profileLink}</h2>
              <p>Public repositories: ${data.public_repos}</p>
              <p>Followers: ${data.followers}</p>
            `;
            window.location.href = data.html_url;
          })
          .catch(error => {
            result.innerHTML = `<p>Error: ${error.message}</p>`;
          });
      });