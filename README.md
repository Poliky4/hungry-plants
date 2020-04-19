# hungry-plants

An Express api that supports Hungry-plants app and sensor unit

## API structure

```

  -------------   1        *   -------------------
  --- Plant ---   <-------->   --- Measurement ---
  -------------                -------------------
  Id [uuid]                    id
  Name [string]                volt
  breed [string]               units
  latest_measurement [Obj]     humidity
                               Timestamp
```

### Endpoints

```
# Get all plants
- GET /

# Get single plant
- GET /:id

# get single plant measurement
- GET /:id/measurements
- GET /:id/measurements/latest

```

## Development

Run `npm run mock` to generate some mock data
