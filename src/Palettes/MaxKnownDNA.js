import PropTypes from "prop-types";

// TODO: merge it with MaxKnownDNALegend
const COLOR_NOTHING = [255, 255, 255, 255];
const COLOR_CORPSE = [100, 100, 100, 255];
const COLOR_ATTACKS = [200, 100, 100, 255];
const COLOR_REPRODUCES = [100, 200, 100, 255];
const COLOR_PHOTO = [200, 200, 100, 255];
const COLOR_DEFILES = [200, 100, 200, 255];
const COLOR_WEIRD = [100, 200, 200, 255];

export default function MaxKnownDNA(data) {
    return data.map((arr) => {
        const cellType = arr[0];
        if (cellType === "corpse") return COLOR_CORPSE;
        else if (cellType === "nothing") return COLOR_NOTHING;
        else {
            const reproduces = arr[1];
            const attacks = arr[2];
            const photosynthesis = arr[3];
            const defiles = arr[4];

            if (reproduces > attacks + photosynthesis) {
                return COLOR_REPRODUCES;
            } else if (attacks > photosynthesis + defiles) {
                return COLOR_ATTACKS;
            } else if (photosynthesis > attacks + defiles) {
                return COLOR_PHOTO;
            } else if (defiles > attacks + photosynthesis) {
                return COLOR_DEFILES;
            } else {
                return COLOR_WEIRD;
            }
        }
    })
}

MaxKnownDNA.propTypes = {
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any))
};