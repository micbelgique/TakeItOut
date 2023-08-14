import React, { useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";

function Configuration() {
    const [urlField, setUrlField] = useState("");
    const [scaleField, setScaleField] = useState(0.1);

    const handleButtonClick = () => {
        if (!urlField || !scaleField) return;
        const url = new URL("https://ambitious-cliff-03009ad03.3.azurestaticapps.net/viewer");
        url.searchParams.set("URL", encodeURIComponent(urlField));
        url.searchParams.set("SCALE", scaleField);

        window.location.href = url.toString();
    };

    return (
        <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "6rem" }}>
            <Typography variant="h4" sx={{ marginBottom: "2rem" }}>
                Dimension Swap
            </Typography>
            <TextField
                fullWidth
                id="urlField"
                label="URL"
                variant="outlined"
                value={urlField}
                onChange={(e) => setUrlField(e.target.value)}
                required
                sx={{ marginBottom: "1rem" }}
            />
            <TextField
                fullWidth
                type="number"
                id="scaleField"
                label="Model Scale"
                variant="outlined"
                value={scaleField}
                onChange={(e) => setScaleField(e.target.value)}
                required
                inputProps={{ min: 0.00001 }}
                sx={{ marginBottom: "2rem" }}
            />

            <Button
                variant="contained"
                sx={{
                    backgroundColor: "#7bbaff",
                    fontWeight: "bold",
                    marginTop: "2rem",
                }}
                onClick={handleButtonClick}
            >
                Submit
            </Button>
        </Container>
    );
}

export default Configuration;