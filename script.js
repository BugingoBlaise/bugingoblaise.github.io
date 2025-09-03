function copyCode(button) {
        const pre = button.nextElementSibling;
        navigator.clipboard.writeText(pre.textContent).then(() => {
          button.textContent = "Copied!";
          setTimeout(() => {
            button.textContent = "Copy";
          }, 2000);
        });
      }