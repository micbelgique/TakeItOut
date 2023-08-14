import { Button } from "@mui/base";
import { Container, TextField } from "@mui/material";
import { useState } from "react";

function Configuration() {

    const [urlField, setUrlField] = useState("");
    const [scaleField, setScaleField] = useState(0.1);

    const handleButtonClick = () => {
        if (!urlField || !scaleField) return;
        const url = new URL("http://localhost:3000/viewer");
        url.searchParams.set("URL", encodeURIComponent(urlField));
        url.searchParams.set("SCALE", scaleField);
        
        window.location.href = url.toString();
      };
    return (
        <Container sx={{ display: "flex", flexDirection: "column", mt: "6rem" }}>
            <TextField
                fullWidth
                id="urlField"
                label="Url"
                variant="standard"
                value={urlField}
                onChange={(e) => setUrlField(e.target.value)}
                required
                sx={{ width: "75%", ml: "10%" }}
            />
            <TextField
                fullWidth
                type="number"
                id="scaleField"
                label="Model Scale"
                variant="standard"
                value={scaleField}
                onChange={(e) => setScaleField(e.target.value)}
                required
                sx={{ width: "75%", ml: "10%" }}
                min={0.00001}
            />

            <Button
                variant="contained"
                sx={{
                    backgroundColor: "#7bbaff",
                    fontWeight: "bold",
                    mt: "2rem",
                }}
                onClick={handleButtonClick}
            >
                Submit
            </Button>


        </Container>
    );
};

export default Configuration;