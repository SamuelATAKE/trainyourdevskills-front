/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
// import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// Material Kit 2 React components
import MKBox from "components/MKBox";
// import MKSocialButton from "components/MKSocialButton";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
// import FilledInfoCard from "examples/Cards/InfoCards/FilledInfoCard";

// Presentation page sections
// import Counters from "pages/Presentation/sections/Counters";

// import Flip from "pages/Presentation/sections/Flip";
// import DesignBlocks from "pages/Presentation/sections/DesignBlocks";
// import Pages from "pages/Presentation/sections/Pages";

// import Download from "pages/Presentation/sections/Download";

// Presentation page components

// Routes
import footerRoutes from "footer.routes";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Chip } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import MKTypography from "../../components/MKTypography";
import routes from "../MenuPerUset/Mentor/menu";

// Images
// import bgImage from "assets/images/bg-presentation.jpg";
// import bgImage from "assets/images/bg-coworking.jpeg";

function ContenuCours() {
  const param = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [cours, setCours] = useState({});
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/api/utilisateur/addedcourse/${user.id}/${param.id}`)
      .then((res) => {
        setCours(res.data);
        axios.delete(`http://localhost:8080/api/cours/${param.id}`).then((sres) => {
          setCours(sres.data);
        });
      });

    navigate("/coursdetails");
  };
  useEffect(() => {
    axios.get(`http://localhost:8080/api/cours/${param.id}`).then((res) => {
      setCours(res.data);
    });
  }, []);
  return (
    <>
      <DefaultNavbar routes={routes} sticky />
      <MKBox
        minHeight="25rem"
        width="100%"
        sx={{
          display: "grid",
          placeItems: "center",
          bakgroundColor: "dark",
        }}
      >
        <MKTypography variant="h2">
          {" "}
          <h2 style={{ textAlign: "center" }}>{cours.titre} </h2>
          <Stack direction="row" spacing={2}>
            <Button color="primary" href={`/modifiercours/${param.id}`} startIcon={<EditIcon />}>
              Modifier
            </Button>
            <Button color="secondary" endIcon={<DeleteIcon />} onClick={handleDelete}>
              Supprimer
            </Button>
          </Stack>
        </MKTypography>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: 1,
          mb: 4,
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Typography
          variant="h4"
          component="h4"
          sx={{
            mb: 3,
            p: 2,
            borderRadius: "0.1em",
            boxShadow: ({ boxShadows: { xs } }) => xs,
          }}
        >
          {cours.titre}
        </Typography>

        <MKTypography
          mt={3}
          mb={3}
          sx={{
            mb: 3,
            p: 2,
            fontSize: "14px",
            borderRadius: "0.1em",
            boxShadow: ({ boxShadows: { xs } }) => xs,
          }}
        >
          <h4>Descriptif</h4>
          {cours.description}
        </MKTypography>
        <MKBox p="auto">
          {" "}
          <Divider
            sx={{
              border: "0.5px solid darkblue",
              borderRadius: "0.4em",
              color: "darkblue",
              backgroundColor: "darkblue",
            }}
          >
            <Chip
              sx={{
                color: "darkblue",
              }}
              label="Supports et Ressources du cours"
            />
          </Divider>
        </MKBox>
        <MKTypography mt={5} mb={3}>
          <h4>Support Principal</h4>
        </MKTypography>
        <br />
        <br />
        <MKTypography mt={5} mb={3}>
          <h4>Ressources secondaires</h4>
        </MKTypography>
        <br />
        <br />
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}
export default ContenuCours;
