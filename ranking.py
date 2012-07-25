
import sys
import json
import dogpy

def rank_k_teachers(me, teachers, k):
  def combined_score(t):
    overlap_teach = len(set(t.teachables) | set(me.learnables))
    overlap_learn = len(set(t.learnables) | set(me teachables))
    return overlap_teach + 0.5 * overlap_learn
  teachers.sort(key=combined_score)
  return teachers[:k]

if __name__ == '__main__':
  if dogpy.valid_call:
    me, teachers, k = dogpy.argv
    top_k = rank_k_teachers(me, teachers, k)
    dogpy.output(top_k)
  else:
    dogpy.error("Bad arguments")

# ===============
#
# if len(sys.argv) != 4:
#   print(json.dumps({ success:false }))
# else:
#   inp = json.loads(sys.stdin.read())
#   me = inp[0]
#   teachers = inp[1]
#   k = inp[2]
#   top_k = rank_k_teachers(me, teachers, k)
#   json.dump(top_k, sys.stdout)
