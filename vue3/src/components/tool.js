import { forEach } from "lodash";
export function addTrigger(component) {
  let np = {};
  forEach(component.props, (value, key) => {
    np[`trigger${key[0].toUpperCase() + key.slice(1)}`] = {
      type: [Number, String, Array, Object, Boolean],
      default: undefined,
    };
  });
  return np;
}
