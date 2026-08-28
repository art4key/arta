FROM golang:1.27.0-bookworm AS build
WORKDIR /app

RUN --mount=type=bind,target=. \
    --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o /bot ./cmd

FROM gcr.io/distroless/static-debian13:nonroot
COPY --from=build /bot /
ENTRYPOINT ["/bot"]
