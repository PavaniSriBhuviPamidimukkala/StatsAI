def recommend_courses(courses, skill_gaps: list[str]):
    gaps = {g.lower() for g in skill_gaps}
    if not gaps:
        return list(courses)
    return [c for c in courses if c.topic.lower() in gaps]
