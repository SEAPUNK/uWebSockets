#include "uUV.h"

uv_loop_t *loops[128];
int loopHead;

// support 128 callbacks maximum
uv_poll_cb callbacks[128];
int cbHead;
