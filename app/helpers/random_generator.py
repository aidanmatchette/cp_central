from django.db.models import Q
from app.models import ActivityGroup, CheckIn, User


def random_generator(request, date, group_size):
    only_checked_in = True if 'only_checked_in' in request.data else False
    group_id = request.user.default_group
    include_staff = True if 'include_staff' in request.data else False

    q_group = Q(group_id=group_id)
    q_dgroup = Q(default_group=request.user.default_group)
    q_date = Q(date=date) if date else Q()
    q_staff = Q(is_staff=False, is_superuser=False) if not include_staff else Q()

    if only_checked_in:
        queue = CheckIn.objects.filter(q_group & q_date).first().user.filter(q_staff).order_by("?")
    else:
        queue = User.objects.filter(q_dgroup & q_staff).order_by("?")
    final_groups = []

    while queue:
        new_group = [queue.first()]
        queue = queue.exclude(id=new_group[0].id)

        # find all groups this person has been assigned
        groups = ActivityGroup.objects.filter(members__in=[new_group[0]])
        unmatched = queue.all()
        for group in groups:
            # exclude everyone this person was previously matched with
            unmatched = unmatched.exclude(id__in=group.members.values_list('pk', flat=True))

        if len(queue) <= group_size:
            # just add the rest to final group if last group would be too small
            for person in queue:
                new_group.append(person)
            queue = None
        else:
            # generate groups based on group size
            for i in range(group_size - 1):
                if unmatched:
                    person = unmatched.first()
                    unmatched = unmatched.exclude(pk=person.pk)
                else:
                    # TODO/Stretch filter on fewest matches
                    person = queue.order_by("?").first()
                new_group.append(person)
                queue = queue.exclude(pk=person.pk)
        final_groups.append(new_group)
    return final_groups
