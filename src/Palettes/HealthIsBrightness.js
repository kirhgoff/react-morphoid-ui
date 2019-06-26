import PropTypes from "prop-types";

const COLOR_NOTHING = [0, 0, 0, 255];
const COLOR_CORPSE = [0, 0, 0, 255];

export default function HealthIsBrightness(data) {
    const maxHealth = data
        .filter(arr => arr[0] === "cell")
        .map(arr => arr[5]) // Health
        .reduce((current, next) => next > current ? next : current);

    return data.map((arr) => {
        const cellType = arr[0];
        if (cellType === "corpse") return COLOR_CORPSE;
        else if (cellType === "nothing") return COLOR_NOTHING;
        else {
            const health = arr[5];
            const brightness = health / maxHealth;
            const value = 255 * brightness;

            return [value, value, value, 255];
        }
    })
}

HealthIsBrightness.propTypes = {
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any))
};