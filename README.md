**ZotImage: Distributed Image Processing Pipeline**
Python, FastAPI, Redis, Celery, Docker, OpenCV

Engineered a high-throughput, asynchronous backend using FastAPI and Celery to manage a distributed task queue, reducing API latency by 70% for CPU-bound image transformations.

Implemented a Microservices-based producer-consumer pattern with Redis as a message broker, ensuring reliable state management and fault tolerance across multiple worker nodes.

Integrated OpenCV and Pillow for automated image normalization (resizing, grayscale, denoising), optimizing raw datasets for Computer Vision model training pipelines.

Built a responsive React dashboard for real-time monitoring of processing statuses, leveraging WebSockets for live progress updates and secure retrieval of optimized assets from AWS S3.

Containerized the entire infrastructure using Docker and Docker Compose, enabling seamless deployment and horizontal scaling of processing workers to handle burst traffic.
