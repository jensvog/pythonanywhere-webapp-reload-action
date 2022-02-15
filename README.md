# pythonanywhere-webapp-reload-action

GitHub action to reload a webapp on pythonanywhere. The service
[pythonanywhere](https://www.pythonanywhere.com) can host web apps based on
Python (i.e. Django, Flask, ...). The web app can be updated by copying files
to the server with various technologies (i.e. Git, SSH, ...) but afterwards the
web app has to be restarted manually. Otherwise the web app is not updated.

In order to enable a continuous deployment to pythonanywhere, this GitHub action
automatically updates your pythonanywhere web app with the help of their
[API](https://help.pythonanywhere.com/pages/API/).

## Note

The pythonanywhere API is currently in beta state. Because of that it is
possible that the action might not work anymore after a change in the API
interface.

## Usage

In order to use the action, it must be integrated to the workflow:

```yaml
- uses: jensvog/pythonanywhere-webapp-reload-action@v1
  with:
    host: <pythonanywhere host>
    username: <your username>
    api-token: <generated api token>
    domain-name: <your domain name>
```

| Parameter | Required | Information |
| --------  | -------- | ----------- |
| host | No | Pythonanywhere host (EU/US). This can be either `eu.pythonanywhere.com` or `www.pythonanywhere.com` (default). |
| username | Yes | Your username for pythonanywhere. |
| api-token | Yes | Generated API token from pythonanywhere. |
| domain-name | Yes | The domain of the webapp you want to reload (`www.example.com` or `user.pythonanywhere.com`). |

### Get API token

In order to get the API token you have

1. Login into your pythonanywhere account.
2. Navigate to `Account`.
3. Click on section `API token`.
4. Generate an API token and save it.

Do not directly paste your api token or other sensitive data in your workflow
xml. Create GitHub action secrets and reference those secrets in your workflow
xml.

# Example

This example reloads a pythonanywhere webapp.

```yaml
name: Deploy pythonanywhere webapp
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      # Upload files
      # ...

      - name: Reload webapp
        uses: jensvog/pythonanywhere-webapp-reload-action@v1
        with:
          host: 'eu.pythonanywhere.com'
          username: {{ secrets.USERNAME }}
          api-token: {{ secrets.APITOKEN }}
          domain-name: {{ secrets.DOMAINNAME }}
```

# License

MIT: See `LICENSE` for detailed license information.
