# Continuous delivery

In order to start the continuous delivery system, please follow these steps:
- Create a github webhook for the repository.
- Copy `config/config-stencil.yml` to `config/config.yml` and populate the values.
- Create a virtual environment and install all the dependencies from `requirements.txt`.
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    pip install --upgrade pip
    pip install -r requirements.txt
    ```
- Run the following command to start `waitress server`.
    ```bash
    cd scripts/
    waitress-serve --port=8989 github:app
    ```