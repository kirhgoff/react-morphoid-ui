import PropTypes from "prop-types";
import WorldView from "../WorldView";

const COLOR_CORPSE = [100, 100, 100, 255];
const COLOR_NOTHING = [0, 0, 0, 255];

function assignMax(storage, key, candidate) {
    if (storage[key] < candidate) storage[key] = candidate;
}

export default function ReproduceAttacksPhotoRGB(data) {
    const extremes = data
        .filter(arr => arr[0] === "cell")
        .reduce(
            (extremes, data) => {
                assignMax(extremes, "reproduces", data[0]);
                assignMax(extremes, "attacks", data[1]);
                assignMax(extremes, "photosynthesis", data[2]);
                assignMax(extremes, "defiles", data[3]);

                return extremes;
            },
            // Default values
            {
                "reproduces": 0,
                "attacks": 0,
                "photosynthesis": 0,
                "defiles": 0
            });

    return data.map((arr) => {
        const cellType = arr[0];
        if (cellType === "corpse") return COLOR_CORPSE;
        else if (cellType === "nothing") return COLOR_NOTHING;
        else {
            const reproduces = arr[1];      // r
            const attacks = arr[2];         // g
            const photosynthesis = arr[3];  // b
            const defiles = arr[4];

            const brightness = 250 * (1 - defiles / extremes["defiles"]);

            const red = attacks / extremes["attacks"] * brightness;
            const green = photosynthesis / extremes["photosynthesis"] * brightness;
            const blue = reproduces / extremes["reproduces"] * brightness;

            return [red, green, blue, 255];
        }
    })
}

ReproduceAttacksPhotoRGB.propTypes = {
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any))
};