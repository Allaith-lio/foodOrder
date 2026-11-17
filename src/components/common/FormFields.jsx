import InputField from "./InputField";
import AvatarField from "./AvatarField";
import {
  UserRound,
  Mail,
  LockKeyhole,
  Search,
  AlignLeft,
  Phone,
  MapPin,
  Home,
} from "lucide-react";

const iconMap = {
  user: UserRound,
  mail: Mail,
  lock: LockKeyhole,
  search: Search,
  alignLeft: AlignLeft,
  phone: Phone,
  mapPin: MapPin,
  home: Home,
};

// Renders every field in a fields definition object (Object.keys order)
// using the shared InputField (or AvatarField for type: "file"), wiring
// value/error/change/blur handlers.
export default function FormFields({
  fields,
  values,
  errors = {},
  onChange,
  onBlur,
  trailingFor,
}) {
  return (
    <>
      {Object.keys(fields).map((name) => {
        const config = fields[name];

        if (config.type === "file") {
          return (
            <AvatarField
              key={name}
              name={name}
              label={config.label}
              error={errors[name]}
              required={config.required ?? !config.optional}
              onChange={onChange(name)}
            />
          );
        }

        const { icon, optional, required, ...rest } = config;
        delete rest.rule;
        const Icon = iconMap[icon];
        return (
          <InputField
            key={name}
            name={name}
            icon={Icon}
            value={values[name] ?? ""}
            onChange={onChange(name)}
            onBlur={onBlur ? onBlur(name) : undefined}
            error={errors[name]}
            required={required ?? !optional}
            trailing={trailingFor ? trailingFor(name) : undefined}
            {...rest}
          />
        );
      })}
    </>
  );
}
