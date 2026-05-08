from collections import defaultdict


class ConnectionManager:
    def __init__(self) -> None:
        self.rooms: dict[str, set[str]] = defaultdict(set)

    def connect(self, room: str, connection_id: str) -> None:
        self.rooms[room].add(connection_id)

    def disconnect(self, room: str, connection_id: str) -> None:
        self.rooms[room].discard(connection_id)

