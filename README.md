# hungry-plants

An Express api that supports Hungry-plants app and sensor unit

## api structure

```

  -------------   1        *   -------------------
  --- Plant ---   <-------->   --- Measurement ---
  -------------                -------------------
  Id [uuid]                    id
  Name [string]                volt
  breed [string]               units
  latest_measurement [Obj]     humidity
                               Timestamp

# Get all plants
- GET /

# Get single plant
- GET /:id

# get single plant measurement
- GET /:id/measurements
- GET /:id/measurements/latest


## Development

create a file called `./db/plants.json` and add the following

```
[
  {
    "id": "1",
    "name": "Plant 1" 
  }
]
```


```