const handleRequest = (req, res) => {
  const { url, method } = req;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      `<html>
                <head><title>Homepage</title></head>
                <body>
                    <h1>Hello, this is assignment for section 3</h1>
                    <form action="/create-user" method="POST">
                        <input type="text" name="username" />
                        <button type="submit">Submit</button>
                    </form>
                </body>
            </html>`
    );

    res.end();
  }

  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      `<html>
                <head><title>Users Page</title></head>
                <body>
                    <ul>
                        <li>User 1</li>
                        <li>User 2</li>
                        <li>User 3</li>
                    </ul>
                </body>
            </html>`
    );

    res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split("=")[1];
      res.statusCode = 302;
      res.setHeader("Location", "/users");
      return res.end();
    });
  }
};

module.exports = handleRequest;
