let itemsInCart: number = 0;

export function listenOnProductCard() {
    const eraseButtons = document.querySelectorAll("#eraseFromCart") as NodeListOf<HTMLButtonElement>;
    const addButtons = document.querySelectorAll("#addToCart") as NodeListOf<HTMLButtonElement>;

    eraseButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (itemsInCart > 0) {
                itemsInCart -= 1;
            }

            // Här antar vi att numOfCandy är ett HTMLElement. Använd en korrekt selektor om det inte är nästa syskon.
            const numOfCandy = button.nextElementSibling as HTMLElement;
            if (numOfCandy) {
                numOfCandy.innerHTML = itemsInCart.toString();
            }
            updateNotisNavbar();
        });
    });

    addButtons.forEach(button => {
        button.addEventListener("click", () => {
            itemsInCart += 1;

            // Här antar vi att numOfCandy är ett HTMLElement. Använd en korrekt selektor om det inte är föregående syskon.
            const numOfCandy = button.previousElementSibling as HTMLElement;
            if (numOfCandy) {
                numOfCandy.innerHTML = itemsInCart.toString();
            }
            updateNotisNavbar();
        });
    });
}

function updateNotisNavbar() {
    const notisNav = document.querySelector(".itemAmountInCart") as HTMLElement;
    if (notisNav) {
        notisNav.innerHTML = itemsInCart.toString();
    }
}
