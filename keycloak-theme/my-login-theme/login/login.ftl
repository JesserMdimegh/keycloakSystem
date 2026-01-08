<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sign in</title>

    <link rel="stylesheet" href="${url.resourcesPath}/css/styles.css">
</head>
<body>

<div class="login-container">
    <img src="${url.resourcesPath}/img/logo.png" class="logo" />

    <h2>Welcome back</h2>

    <#if message?has_content>
        <div class="error">
            ${message.summary}
        </div>
    </#if>

    <form id="kc-form-login"
          action="${url.loginAction}"
          method="post">

        <input type="text"
               name="username"
               placeholder="Username"
               autofocus />

        <input type="password"
               name="password"
               placeholder="Password" />

        <button type="submit">
            Sign In
        </button>
    </form>
</div>

</body>
</html>
