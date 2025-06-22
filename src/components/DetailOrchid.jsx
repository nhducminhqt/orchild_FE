import React from "react";
import { useParams } from "react-router";
import { Breadcrumb, Card, Badge, Image } from "react-bootstrap";
import axios from "axios";

export default function DetailOrchid() {
  const [orchid, setOrchid] = React.useState({});
  const params = useParams();
  const id = params.id;
  console.log(params.id);

  const baseUrl = import.meta.env.VITE_API_URL;
  React.useEffect(() => {
    fetchData();
  }, [id]);
  const fetchData = () => {
    axios
      .get(`${baseUrl}/${id}`)
      .then((response) => {
        setOrchid(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12 col-md-8 p-3">
          <Breadcrumb>
            <Breadcrumb.Item href="#home">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>
              {orchid.orchidName || "Loading..."}
            </Breadcrumb.Item>
          </Breadcrumb>

          <Badge className="custom-chip my-3">
            {orchid.orchidName || "Loading..."}
          </Badge>

          <Card className="mt-3">
            <Card.Header>
              <p className="text-primary fs-5">
                {orchid.description || "Loading..."}
              </p>
            </Card.Header>
            <hr />
            <Card.Body>
              {orchid.isNatural ? (
                <Badge className="custom-natural-chip">
                  This Orchid is a natural product
                </Badge>
              ) : (
                <Badge bg="warning" text="dark">
                  This Orchid is an industrial product
                </Badge>
              )}
            </Card.Body>
          </Card>
        </div>

        <div className="col-12 col-md-4 p-3">
          <div className="badge-container">
            <Badge className="badge-svg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 48 48"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M26.924 4c.967 0 1.866.217 2.667.675c.685.39 1.462.93 2.037 1.734l-.012.01l.01.014l2.332 3.022l.822 1.095a9.414 9.414 0 0 1-.002 11.34l-4.508 5.818l6.95 8.944a2 2 0 0 1-.242 2.713l-4.066 3.662A2 2 0 0 1 30 42.775l-5.79-7.383l-5.845 7.451a2 2 0 0 1-2.781.36l-4.379-3.317a2 2 0 0 1-.368-2.826l7.314-9.358l-4.504-5.714l-.006-.008a9.414 9.414 0 0 1-.002-11.339l.002-.002l.811-1.082l2.337-3.029l.108-.141C18.008 4.85 19.853 4 21.678 4zm1.675 2.411c.551.315 1.02.66 1.348 1.088l-.015.011l.1.13a4.03 4.03 0 0 1-.022 4.792c-.934-.57-2.045-.923-3.177-.923h-5.247c-1.123 0-2.267.3-3.241.924a4.2 4.2 0 0 1-.735-2.366c0-.815.256-1.632.773-2.331l.115-.15l.01-.014C19.21 6.59 20.434 6 21.677 6h5.248c.66 0 1.21.145 1.675.411m-9.025 7.616l4.6 5.942l4.6-5.942c-.598-.325-1.278-.518-1.94-.518h-5.248c-.72 0-1.42.179-2.012.518m9.422 12.06l-3.552-4.49l6.066-7.836a5.95 5.95 0 0 0 1.199-2.638l.475.633a7.415 7.415 0 0 1 .003 8.921zm-9.57 3.232l-7.013 8.973l4.378 3.317l6.146-7.836zM16.91 13.852a6.06 6.06 0 0 1-1.192-2. дума-648l-.479.639l-.003.004a7.414 7.414 0 0 0-.005 8.918l9.766 12.39l6.578 8.386l4.066-3.662l-7.42-9.55l-4.795-6.06z"
                  clipRule="evenodd"
                />
              </svg>
            </Badge>
            <Image
              src={orchid.image}
              alt={orchid.orchidName || "Loading..."}
              fluid
              className="my-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
