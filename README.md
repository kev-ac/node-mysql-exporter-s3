<br />
<div align="center">
  <a href="https://github.com/kev-ac/node-mysql-exporter-s3">
    <img src="icon.png" alt="Logo" height="192">
  </a>

<h3 align="center">MySQL S3 Exporter</h3>

  <p align="center">
    Simple way to export a MySQL database to a S3-compatible storage
  </p>
</div>


## About

This is a simple node application to export a single database to a S3 compatible storage endpoint (like AWS S3, Backblaze, Cloudflare R2).

## Getting Started

### Use with Docker

Pull the Docker image from DockerHub and pass in the needed environment variables or a .env file.<br>
You can find a list of all required environment variables in the [.env file](.env).

  ```sh
  docker pull kevac/node-mysql-exporter-s3
  ```

## Usage
There are several environment variables to set up all necessary connection points:

- `MYSQL_USERNAME` MySQL username
- `MYSQL_PASSWORD` MySQL password
- `MYSQL_DATABASE` MySQL database
- `MYSQL_HOST` MySQL hostname
- `MYSQL_PORT` MySQL port
- `S3_BUCKET` S3 bucket name
- `S3_ENDPOINT` S3 endpoint url
- `S3_REGION`, S3 region key
- `S3_ACCESS_KEY_ID` S3 access key id
- `S3_SECRET_ACCESS_KEY` S3 secret access key
- `FILE_PREFIX` File name without extension to be used. {DATETIME} will automatically be replaced with the current datetime
- `DELETE_AFTER_DAYS` Delete files in the S3 bucket older than x days in the past (end of day)


## Roadmap

See the [open issues](https://github.com/kev-ac/node-mysql-exporter-s3/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## License

Distributed under the GNU GPLv3 License. See [LICENSE](LICENSE) for more information.

---
Thanks to [undraw.co](https://undraw.co) for the illustration above.
