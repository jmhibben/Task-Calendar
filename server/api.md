# /api

## /auth

### POST

- Sends authorization data to Google API, returns the json response

## /events

### GET

- Fetches a JSON object of all events in the calendar, organised by date
- Returns a JSON object of `date: [event,...]` pairs
  - date is expressed as `YYYY-M[M]-D[D]`
  - event is the `event.id`

### POST

- Creates a new event on Google Calendar

## /events/:date

### GET

- Fetches a JSON of all events on a given date
- `date` _must_ be of the form `YYYY-MM-DD`

## /month/:month (if time allows)

### POST

- Fetches a JSON object of all events in the calendar, then filters for month
