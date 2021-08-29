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
- Copy the `NGINX` configuration file `nginx/nginx.conf` to `/etc/nginx/sites-available/`, make the necessary changes and activate the configuration.
    ```bash
    cp nginx/nginx.conf /etc/nginx/sites-avaliable/cms_component_library.conf
    cd ../sites-enabled/
    ln -s ../sites-available/cms_component_library.conf
    service nginx restart
    ```
- Copy `supervisord/supervisord.conf` to `/etc/supervisor/conf.d/` and populate the values. Activate this configuration by using the following commands.
    ```bash
    cp supervisord/supervisord.conf /etc/supervisor/conf.d/cms_component_library.conf
    supervisorctl reread
    supervisorctl update
    ```
